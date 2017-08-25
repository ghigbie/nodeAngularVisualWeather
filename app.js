let getUser = (id, callback) => {
    let user = {
        id: id,
        name: 'Vikram'
    };
    callback(user);
};

getUser(31, (userObject) => {
    console.log(userObject);
});