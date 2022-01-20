window.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('github-form')
    const userList = document.querySelector('#user-list')
    const repoList = document.querySelector('#repos-list')
    form.addEventListener('submit', (e) => {
        e.preventDefault()
        const search = e.target.search.value    
        
        fetch(`https://api.github.com/search/users?q=${search}`)
            .then(r => r.json())
            .then(data => {
                const user = data.items
                user.forEach(obj =>{
                    const newLi = document.createElement('li')
                    newLi.textContent = obj.login
                    newLi.addEventListener('click', () => {
                        const person = obj.login
                        fetch(`https://api.github.com/users/${person}/repos`)
                            .then(r => r.json())
                            .then(repoArr => {
                                repoArr.forEach(createRepo)
                            })
                    })
                   userList.append(newLi)
                })
          })
    })
    function createRepo(obj){
        const repo = document.createElement('li')
        repo.textContent = obj.name
        repoList.appendChild(repo)
    }
})

