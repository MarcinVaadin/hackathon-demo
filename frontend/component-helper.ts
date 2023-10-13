// @ts-ignore
import {
    DevToolsInterface,
    DevToolsPlugin
} from '@vaadin/flow-frontend/vaadin-dev-tools/vaadin-dev-tools';
import {css, html, LitElement, nothing, TemplateResult} from 'lit';
import {customElement, property, state} from 'lit/decorators.js';
import {ElementPicker} from "pick-dom-element";

import * as chatgptCache from './component-helper/chatgpt-cache.json';
import {ComponentAttribute, promptChatGPT} from "Frontend/component-helper/chatgpt-utils";

let devTools: DevToolsInterface;

const style = { borderColor: "#0000ff" };
const picker = new ElementPicker({ style });

const gptCache = new Map(Object.entries((chatgptCache as any).default));

@customElement('component-helper')
export class ComponentHelper extends LitElement {
    @property({ type: Array })
    messages: string[] = [];

    @state()
    componentPickActive: boolean = false;

    @state()
    el?: HTMLElement;

    @state()
    elAttributes?: ComponentAttribute[];

    @state()
    headerText?: string;

    @state()
    loading: boolean = false;

    static get styles() {
        return css`
        .header {
            display: flex; 
            justify-content: space-between;
        }
        .header h3 { margin: 0; }
        
        .attrs {
            display: grid;
            grid-template-columns: auto auto auto;
            grid-gap: 5px;
            margin-top: 20px;
        }
        
        .attrs label {
            justify-self: end;
        }
        
        .attrs input {
            justify-self: start;
            max-width: 50px;
        }
        
        `;
    }

    connectedCallback() {
        super.connectedCallback();
        window.addEventListener('chatgpt-prompted', ev => {
            this.loading = true;
            this.elAttributes = undefined;
        });
        window.addEventListener('chatgpt-response', (ev) => {
            this.loading = false;
            this.elAttributes = (ev as CustomEvent).detail;
        });
    }

    render() {
        return html`<div style="padding: 20px">
            <div class="header">
                <button @click=${this.openPicker}>Pick component</button>
                <h3>${this.headerText}</h3>
            </div>
            <p ?hidden="${!this.loading}">Loading...</p>
            ${this.renderAttributes()}
        </div>`;
    }

    private openPicker = () => {
        picker.start({
            onHover: (el) => {
                this.headerText = `picking ${el.localName}`;
            },
            onClick: async (el) => {
                picker.stop();
                this.headerText = el.localName;
                this.el = el;
                this.fetchComponentInfo(el.localName);
            },
        });
    };

    private fetchComponentInfo = async (localName: string) => {
        if (gptCache.has(localName)) {
            console.log(`Loading ${localName} from cache`);
            dispatchEvent(new CustomEvent('chatgpt-response', {detail: gptCache.get(localName)}));
            return;
        }

        promptChatGPT(localName);
    };

    private renderAttributes(): TemplateResult {
        return html`${this.elAttributes ? 
            html`<div class="attrs">${this.elAttributes.map(attr => this.renderAttribute(attr))}</div>`
            : nothing}`;
    }

    private renderAttribute(attr: ComponentAttribute) {
        let inputType = 'text';
        let setter = (target: any) => {
            if (target.value) {
                this.el!.setAttribute(attr.name, target.value);
            } else {
                this.el!.removeAttribute(attr.name);
            }
        }
        if (attr.type.toLowerCase() == 'boolean') {
            inputType = 'checkbox';
            setter = (target: any) => {
                if (target.checked) {
                    this.el!.setAttribute(attr.name, target.checked);
                } else {
                    this.el!.removeAttribute(attr.name);
                }
            }
        }

        return html`
            <label for="${attr.name}">${attr.name}</label>
            <input type="${inputType}" id="${attr.name}"
                @change="${(ev: any) => {setter(ev.target);}}"/>
            <span class="description">${attr.description}</span>`;
    }


}

const plugin: DevToolsPlugin = {
    init: function (devToolsInterface: DevToolsInterface): void {
        devTools = devToolsInterface;
        devTools.addTab('Component Helper', 'component-helper');
    }
};

(window as any).Vaadin.devToolsPlugins.push(plugin);