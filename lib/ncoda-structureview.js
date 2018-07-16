'use babel';

import NcodaStructureviewView from './ncoda-structureview-view';
import { CompositeDisposable } from 'atom';

export default {

  ncodaStructureviewView: null,
  modalPanel: null,
  subscriptions: null,

  activate(state) {
    this.ncodaStructureviewView = new NcodaStructureviewView(state.ncodaStructureviewViewState);
    this.modalPanel = atom.workspace.addModalPanel({
      item: this.ncodaStructureviewView.getElement(),
      visible: false
    });

    // Events subscribed to in atom's system can be easily cleaned up with a CompositeDisposable
    this.subscriptions = new CompositeDisposable();

    // Register command that toggles this view
    this.subscriptions.add(atom.commands.add('atom-workspace', {
      'ncoda-structureview:toggle': () => this.toggle()
    }));
  },

  deactivate() {
    this.modalPanel.destroy();
    this.subscriptions.dispose();
    this.ncodaStructureviewView.destroy();
  },

  serialize() {
    return {
      ncodaStructureviewViewState: this.ncodaStructureviewView.serialize()
    };
  },

  toggle() {
    console.log('NcodaStructureview was toggled!');
    return (
      this.modalPanel.isVisible() ?
      this.modalPanel.hide() :
      this.modalPanel.show()
    );
  }

};
