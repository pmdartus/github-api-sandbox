workflow "My Action" {
  on = "push"
  resolves = ["Hello world"]
}

action "Hello world" {
  uses = "./actions/hello-world"

  env = {
      MY_NAME = "Foo"
  }

  args = "\"Hello world, I'm $MY_NAME!\""
}