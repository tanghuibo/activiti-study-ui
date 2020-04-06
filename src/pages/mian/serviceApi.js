export default {
  queryDeployment: () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return fetch("/activiti/queryDeployment", requestOptions).then((response) =>
      response.json()
    );
  },
  deleteDeploymentById: (id) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ id });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("/activiti/deleteDeploymentById", requestOptions)
      .then((response) => response.json())
  },
  addDeployment: ({
    name, bpmnXml
  }) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ name, bpmnXml });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return fetch("/activiti/addDeployment", requestOptions)
      .then((response) => response.json())
  }
};
