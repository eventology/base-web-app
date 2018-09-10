import React from 'react'
import { BrowserRouter, Link, Redirect, Route, Switch } from 'react-router-dom'
import Home from 'src/home/Home'

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <main>
          <nav style={{ marginBottom: '1rem' }}>
            {/* <Link to="/feed/events/featured">Featured Events</Link>{" "}
            <Link to="/feed/events/all">All Events</Link>{" "}
            <Link to="/feed/events/attending">Attending Events</Link>{" "} */}
          </nav>

          <section>
            <Switch>
              <Route exact={false} path="/" render={({ history }) => <Home />} />
              {/* <Redirect exact={true} from="/" to="/feed/events/featured" /> */}

              {/* <Route
                exact={true}
                path="/feed/events/featured"
                render={({ history }) => (
                  <FeedEventList
                    key="featured"
                    feedList={feedStore.featuredEventsList}
                    onConventionClick={(id) => history.push(`/conventions/${id}`)}
                  />
                )}
              />

              <Route
                exact={true}
                path="/feed/events/all"
                render={({ history }) => (
                  <FeedEventList
                    key="all"
                    feedList={feedStore.allEventsList}
                    onConventionClick={(id) => history.push(`/conventions/${id}`)}
                  />
                )}
              /> */}
            </Switch>
          </section>
        </main>
      </BrowserRouter>
    )
  }
}

export default App
