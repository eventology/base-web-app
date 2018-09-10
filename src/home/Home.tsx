import { observer } from 'mobx-react';
import React from 'react';

interface Props {}

@observer
export default class Home extends React.Component<Props> {
  render() {
    return (
      <main>
        <section>Hello World!</section>
        <section />
      </main>
    );
  }
}
