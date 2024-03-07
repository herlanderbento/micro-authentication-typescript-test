export interface Queue {
  on(callback: Function): Promise<void>;
  publish(data: any): Promise<void>;
}
