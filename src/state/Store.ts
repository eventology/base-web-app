import { action, observable } from "mobx"

interface DataWithId {
  id: string
}

export class Store<T extends DataWithId> {
  @observable
  items = new Map<string, T>()

  @action.bound
  storeItem(item: T) {
    this.items.set(item.id, item)
  }

  @action.bound
  storeItemList(items: T[]) {
    for (const item of items) {
      this.items.set(item.id, item)
    }
  }
}
