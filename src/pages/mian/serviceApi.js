function myFetch(...param) {
  return fetch(...param)
    .then(response => response.text())
    .then(text => JSON.parse(text))
    .catch(console.error);
}
export default {
  queryDeployment: () => {
    let requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    return myFetch("/activiti/queryDeployment", requestOptions);
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

    return myFetch("/activiti/deleteDeploymentById", requestOptions);
  },
  addDeployment: ({ name, bpmnXml }) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ name, bpmnXml });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return myFetch("/activiti/addDeployment", requestOptions);
  },
  startProcessInstance: ({ processDefinitionId, businessKey, context }) => {
    let myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    let raw = JSON.stringify({ processDefinitionId, businessKey, context });

    let requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    return myFetch("/activiti/startProcessInstance", requestOptions);
  },
};
