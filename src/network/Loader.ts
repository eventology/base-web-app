import { action, observable } from "mobx"
import { fetchJson } from "./fetchJson"

export interface LoaderOptions<T> {
  endpoint: string
  preloadedData?: T
  onLoad?: LoadedCallback<T>
}

export type LoadedCallback<T> = (data: T) => void

export class Loader<T> {
  @observable
  data?: T

  @observable
  isLoading = false

  @observable
  errorMessage?: string

  private endpoint: string
  private onLoad?: LoadedCallback<T>

  constructor(options: LoaderOptions<T>) {
    this.endpoint = options.endpoint
    this.data = options.preloadedData
    this.onLoad = options.onLoad
  }

  async load() {
    this.loadStart()

    try {
      const data = await fetchJson<T>(this.endpoint)
      this.loadSuccess(data)

      if (this.onLoad) {
        this.onLoad(data)
      }
    } catch (error) {
      this.loadError(error)
    }
  }

  @action
  private loadStart() {
    this.isLoading = true
  }

  @action
  private loadSuccess(data: T) {
    this.isLoading = false
    this.data = data
  }

  @action
  private loadError(error: any) {
    this.isLoading = false
    this.errorMessage = error.message || String(error)
  }
}
