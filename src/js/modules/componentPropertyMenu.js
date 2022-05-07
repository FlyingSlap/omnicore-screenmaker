import Rescale from './rescale';

const windowInit = () => {
    const tabs = document.querySelector('.c-property-menu .tabs').children;
    [...tabs].forEach((tab) => tab.addEventListener('click', tabSwitch));
};

// Switching between tabs
const tabSwitch = (event) => {
    const target = event.target;
    let previous;
    [...target.parentNode.children].forEach((item) => {
        if (item.classList.contains('is-selected')) {
            previous = item;
            return;
        }
    });
    const previousContent = previous.getAttribute('name');
    const targetContent = target.getAttribute('name');
    previous.classList.remove('is-selected');
    target.classList.add('is-selected');
    document.querySelector(`.c-property-menu__content[name="${previousContent}"]`).classList.toggle('hide');
    document.querySelector(`.c-property-menu__content[name="${targetContent}"]`).classList.toggle('hide');
};

// Saves new component config to window property (component settings will be withdrawn in componentParser.js during app build)
const saveConfig = async () => {
    const form = document.forms.namedItem('c-property-form');
    const componentConfig = {};
    Array.from(form.elements).forEach((item) => {
        if (item.getAttribute('name')) {
            componentConfig[item.getAttribute('name').split('-')[1]] = item.value;
        }
    });
    const index = window.components.findIndex((component) => component === window.activeComponent);
    window.components[index].componentConfig = {
        ...window.components[index].componentConfig,
        ...componentConfig,
    };

    const textNode = window.components[index].querySelector('.text');
    if (textNode) {
        textNode.innerHTML = window.components[index].componentConfig.text;
        Rescale.rescaleComponents();
    }

    // Not working beacuse some elements have nested element which would overwrite (works just with button)

    // if (window.components[index].innerText) {
    //   window.components[index].innerText = componentConfig.text;
    // }
    return true;
};

export default { windowInit, saveConfig };
