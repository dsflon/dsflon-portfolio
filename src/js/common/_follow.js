import Fetch from './_fetch';

const Follow = (actions,follow,e) => {

    e.preventDefault();

    // window.Loading.Show(200);
    // Fetch(window.api.follow, {
    //     "search_user_id": e.currentTarget.id,
    //     "user_id": window.userData ? window.userData["user_id"] : null,
    //     "language_flg": "ja"
    // }, () => {
        // window.Loading.Hide(200);
        // window.BodyMessage.AutoPlay( follow ? "フォローしました。" : "フォローを解除しました。" );
        // actions.Follow(follow);
    // },() => {
    //     alert("接続に失敗しました。");
    //     window.Loading.Hide(200);
    // });

    console.log("follow:", {
        "search_user_id": Number(e.currentTarget.id),
        "user_id": window.userData ? window.userData["user_id"] : null,
        "language_flg": "ja"
    });

    window.Loading.Show(200);

    setTimeout( () => {
        window.Loading.Hide(200);
        window.BodyMessage.AutoPlay( follow ? "フォローしました。" : "フォローを解除しました。" );
        actions.Follow(follow);
    }, 1000)

}


export default Follow;
