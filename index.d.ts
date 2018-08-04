type User = {
  login: string
}

type Issue = {
  id: string | number
  user: User
  labels: array
}

type Repository = {
  name: string
  full_name: string
  owner: User
}

type Comment = {
  body: string
  user: User
}

type Context = {
  payload: {
    issue: Issue
    comment: Comment
    repository: Repository
  }
}

type ListIssueAPIResponse = Issue[]
