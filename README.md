# case-reducer

## Installation

```bash
$ npm install case-reducer --save
```

## Usage

```js
import caseReducer from "case-reducer"
import {
  REQUEST_USER_PROFILE,
  USER_PROFILE_RESPONSE
} from "actions/user"

const initialState = {
  isFetching: false,
  id: null,
  username: null
}

const cases = {
  [ REQUEST_USER_PROFILE ] (state) {
    return {
      ...state,
      isFetching: true
    }
  },


  [ USER_PROFILE_RESPONSE ] (state, user) {
    return {
      ...state,
      isFetching: false,
      ...user
    }
  }
}

export default caseReducer(initialState, cases)
```