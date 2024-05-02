const CreateUser = async (email, password) => {
    return (
        await fetch("https://friendly-happiness-v9g77rrrg9gcw457-3001.app.github.dev/signup", {
            method: 'POST', 
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email: email,
                password: password,
                // is_active: is_active
            })
        })
        .then((res)=>{
            if (!res.ok) {
                throw Error();
            }
            return res.json()
        })
        .then(data => data)
        .catch(error => console.log(error)) 
    )
}

export default CreateUser;