export interface Subscription {
  id: number
  title: string
  description: string
  type: SubscriptionType
}
enum SubscriptionType {
  A = 'a',
  B = 'b',
  C = 'c'
}
