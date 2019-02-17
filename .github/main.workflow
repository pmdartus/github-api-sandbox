workflow "My Action" {
  on = "push"
  resolves = ["Performance benchmark"]
}

action "Performance benchmark" {
    uses = "./actions/test-checks"
    secrets = ["GITHUB_TOKEN"]
}