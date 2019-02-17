workflow "My Action" {
  on = "push"
  resolves = ["Hello world", "Test checks"]
}

action "Hello world" {
  uses = "./actions/hello-world"

  env = {
      MY_NAME = "Foo"
  }

  args = "\"Hello world, I'm $MY_NAME!\""
}

action "Test checks" {
    uses = "./actions/test-checks"
}