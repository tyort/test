export default class LocalStorageUtil {
  constructor() {
    this.keyName = `clients`;
  }

  getClients() {
    const clients = localStorage.getItem(this.keyName);
    if (clients !== null) {
      return JSON.parse(clients);
    }
    return [];
  }

  putClient(clientInformation) {
    const clients = this.getClients();
    const index = clients.findIndex((it) => it[`Phone number`] === clientInformation[`Phone number`]);

    if (index === -1) {
      clients.push(clientInformation);

    } else {
      clients.splice(index, 1, clientInformation);
    }

    localStorage.setItem(this.keyName, JSON.stringify(clients));
  }
}
