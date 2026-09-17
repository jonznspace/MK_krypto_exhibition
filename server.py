from livereload import Server

server = Server()

server.watch("04_exploration/**/*.html")
server.watch("04_exploration/**/*.css")
server.watch("04_exploration/**/*.js")

server.serve(
    root=".",
    host="127.0.0.1",
    port=8080
)