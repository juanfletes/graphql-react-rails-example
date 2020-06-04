import React from 'react';
import cs from './styles';
import React, { useRef } from 'react';
import { Query, Mutation } from "react-apollo";
import { Me, SignMeIn } from "./operations.graphql";

export default () => (
  <Query query={Me}>
  {({ data, loading }) => {
    if (loading) return "...Loading";
    if (!data.me) {
      <Mutation mutation={SignMeIn}>
        {(signIn, { loading: authenticating }) =>
          authenticating ? (
            "..."
          ) : (
            <form onSubmit={() => signIn(/* email here */)}>
              <input type="email" />
              <input type="submit" value="Sign In" />
            </form>
          )
        }
      </Mutation>
      return;
    }

    const { fullName } = data.me;
    return <div className={cs.info}>😈 {fullName}</div>;
  }}
</Query>
)