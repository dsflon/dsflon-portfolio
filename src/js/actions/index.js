
const List = (value) => {
    return { type: "LIST", value };
}
const Post = (value) => {
    return { type: "POST", value };
}
const Login = (value) => {
    return { type: "LOGIN", value };
}

export {
    Login,
    List,
    Post
}
