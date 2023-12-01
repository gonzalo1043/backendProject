const formNewMessage = document.querySelector('form')

formNewMessage.addEventListener('submit', async event => {
    event.preventDefault()

    const formDataEncoded = new URLSearchParams(new FormData(formNewMessage))

    try {
        const res = await fetch(
        '/api/mensajes',
        {
            method: 'POST',
            body: formDataEncoded,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        },
        )
        
        const resData = await res.json()

        if (res.status === 201) {
            console.log(resData)
        }
    } catch (err) {
        console.log(err.message)
    }
})
