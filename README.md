# Clinichub

*Description here*

## Installation

Clone project

```
$ git clone https://github.com/jenwich/clinichub.git
```

### Install server

1. Install virtualenv to project (use name `env_clinichub`)

  ```
  $ cd clinichub
  $ virtualenv env_clinichub
  ```

2. Activate virtualenv

  ```
  $ source ./env_clinichub/bin/activate
  ```

3. Install python dependencies

  ```
  $ pip install -r requirements.txt
  ```
4. Create `secret.py`

  Create `clinichub/secret.py` - contains secret variables for this project such as secretkey, database connection parameters

### Install client (Optional)

1. Install node.js & npm
2. Install dependencies

  ```
  $ npm install

## How to run it

### Server

Run server

```
$ ./manage.py runserver
```
or run via npm script (require node.js & npm)
```
$ npm start
```
or run django shell
```
$ ./manage.py shell
```

### React.js

* Run dev server

  ```
  $ npm run dev
  ```

* Build

  ```
  $ npm run build
  ```
