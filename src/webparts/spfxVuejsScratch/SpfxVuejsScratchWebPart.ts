import { Version } from '@microsoft/sp-core-library';
import {
  BaseClientSideWebPart,
  IPropertyPaneConfiguration,
  PropertyPaneTextField
} from '@microsoft/sp-webpart-base';
import { escape } from '@microsoft/sp-lodash-subset';

import * as strings from 'SpfxVuejsScratchWebPartStrings';

// Importing Vue.js
import Vue from 'vue';
// Improting Vue.js SFC
import SpfxVuejsScratchComponent from './components/SpfxVuejsScratch.vue';

export interface ISpfxVuejsScratchWebPartProps {
  description: string;
  other: string;
}

export default class SpfxVuejsScratchWebPart extends BaseClientSideWebPart<ISpfxVuejsScratchWebPartProps> {

  public render(): void {
    const id: string = `wp-${this.instanceId}`;
    this.domElement.innerHTML = `<div id="${id}"></div>`;

    let el = new Vue({
      el: `#${id}`,
      render: h => h(SpfxVuejsScratchComponent, {
        props: {
          description: this.properties.description,
          other: this.properties.other
        }
      })
    });
  }

  protected get dataVersion(): Version {
    return Version.parse('1.0');
  }

  protected getPropertyPaneConfiguration(): IPropertyPaneConfiguration {
    return {
      pages: [
        {
          header: {
            description: strings.PropertyPaneDescription
          },
          groups: [
            {
              groupName: strings.BasicGroupName,
              groupFields: [
                PropertyPaneTextField('description', {
                  label: strings.DescriptionFieldLabel
                }),
                PropertyPaneTextField('other', {
                  label: strings.OtherFieldLabel
                })
              ]
            }
          ]
        }
      ]
    };
  }
}
