import { action, observable } from "mobx"
import { fetchJson } from "./fetchJson"

export interface ListLoaderOptions<T> {
  endpoint: string
  limit?: number
  onLoad?: ItemsLoadedCallback<T>
}

export type ItemsLoadedCallback<T> = (items: T[]) => void

export interface ListResponse<T> {
  items: T[]
  lastKey?: string
  isEndReached: boolean
}

export class ListLoader<T> {
  @observable
  items: T[] = []

  @observable
  isLoading = false

  @observable
  errorMessage?: string

  @observable
  isEndReached: boolean = false

  private lastKey?: string

  private endpoint: string
  private limit: number
  private onLoad?: ItemsLoadedCallback<T>

  constructor(options: ListLoaderOptions<T>) {
    this.endpoint = options.endpoint
    this.limit = options.limit || 20
    this.onLoad = options.onLoad
  }

  @action
  refresh() {
    this.lastKey = undefined
    this.isEndReached = false;
  }

  async loadMore() {
    if (this.isLoading || this.isEndReached) {
      return
    }

    this.loadMoreStart()

    try {
      const response = await fetchJson<ListResponse<T>>(this.endpoint, {
        query: {
          limit: this.limit,
          lastKey: this.lastKey,
        },
      })

      this.loadMoreSuccess(response)

      if (this.onLoad) {
        this.onLoad(response.items)
      }
    } catch (error) {
      this.loadMoreError(error)
    }
  }

  @action
  private loadMoreStart() {
    this.isLoading = true
    this.errorMessage = undefined
  }

  @action
  private loadMoreSuccess(response: ListResponse<T>) {
    if (!this.lastKey) {
      this.items = response.items
    } else {
      this.items.push(...response.items)
    }
    this.lastKey = response.lastKey
    this.isEndReached = response.isEndReached || false;

    this.isLoading = false
  }

  @action
  private loadMoreError(error: any) {
    this.errorMessage = error.message || String(error)
    this.isLoading = false
  }
}
