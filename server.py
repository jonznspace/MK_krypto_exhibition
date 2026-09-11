from livereload import Server

server = Server()

server.watch("index.html")
""" server.watch("style.css")
server.watch("script.js") """

server.serve(
    root=".",
    host="127.0.0.1",
    port=8080
)