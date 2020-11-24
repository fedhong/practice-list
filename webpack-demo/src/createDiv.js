function createDivToBody(id, innerHTML) {
    var element = document.createElement('div');
    element.id = id;
    element.innerHTML = innerHTML;
    document.body.appendChild(element);
}

export default createDivToBody;