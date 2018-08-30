
const Sign = {

    Check: () => {

        let user = localStorage.getItem(window.LSUser);

        if(user) {
            window.userData = JSON.parse(user);
        } else {
            let userData = {
                "user_id": 4
            }
            localStorage.setItem(window.LSUser, JSON.stringify(userData));
            window.userData = userData;
        }

    },

    Up: (data,callback) => {

        let signinData = {},
            inputData = data;

        // window.Loading.Show();
        //
        // let key = inputData.email.replace('.','_'),
        //     name = inputData.email.split('.');
        //     name = toUpperFirstLetter(name[0]) + " " + toUpperFirstLetter(name[1])
        //
        // signinData[key] = {
        //     "dep": inputData.dep,
        //     "name": name
        // }
        //
        // window.userRef.update(signinData).then( () => {
        //     localStorage.setItem(window.LSUser, JSON.stringify(signinData));
        //     if(callback) callback()
        // }).catch( (e) => {
        //     window.BodyMessage.AutoPlay("サインアップに失敗しました");
        //     window.Loading.Hide();
        // });

    },

    In: (data,callback) => {

        localStorage.setItem(window.LSUser, JSON.stringify(data));

        // let signinData = {};

        // window.Loading.Show();
        //
        // window.userRef.child(key).once('value').then( (snapshot) => {
        //
        //     let data = snapshot.val();
        //
        //     delete data.device;
        //
        //     signinData[key] = data;
        //
        //     localStorage.setItem(window.LSUser, JSON.stringify(signinData));
        //     if(callback) callback()
        //
        // }).catch( (e) => {
        //
        //     window.BodyMessage.AutoPlay("アカウントが存在しません");
        //     window.Loading.Hide();
        //
        // });

    },

    Out: (data,callback) => {

        let res = confirm("サインアウトしますか？");
        if( res == true ) {

            // window.Loading.Show();
            //
            // let signinData = {};
            //     signinData[data] = null;
            // localStorage.setItem(window.LSUser, JSON.stringify(signinData));

            if(callback) callback();
        } else {
            // window.Loading.Hide();
        }

    },

    Remove: (callback) => {

        // let stuser = localStorage.getItem(window.LSUser);
        //     stuser = JSON.parse(stuser);
        //
        // stuser = Object.keys(stuser)[0];
        //
        // Promise.resolve()
        // .then(() => {
        //     return new Promise((resolve, reject) => {
        //         window.userRef.child(stuser).once('value').then( (snapshot) => {
        //             let data = snapshot.val();
        //             !data.device ? resolve() : reject();
        //         });
        //     });
        // })
        // .then(() => {
        //     let res = confirm("アカウントを削除しますか？");
        //     if( res == true && stuser ) {
        //         window.Loading.Show();
        //         window.userRef.child(stuser).remove().then( () => {
        //             localStorage.removeItem(window.LSUser);
        //             localStorage.removeItem(window.LSData);
        //             window.Loading.Hide();
        //             if(callback) callback();
        //         });
        //     }
        // }).catch(() => {
        //     window.BodyMessage.AutoPlay("端末をすべて返却してください");
        //     window.Loading.Hide();
        // });

    }

}


export default Sign;
