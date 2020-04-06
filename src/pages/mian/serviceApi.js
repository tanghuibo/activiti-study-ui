export default {
    queryDeployment: () => {
        let requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

        return fetch("/activiti/queryDeployment", requestOptions)
            .then(response => response.json())
    }
}