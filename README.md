# Clinichub

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

4. Run server

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
 
### Install client (Optional - ไม่ต้องมีก็ได้)
 
1. Install node.js & npm
2. Install dependencies

  ```
  $ npm install
  ```

3. Run dev server

  ```
  $ npm run dev
  ```

4. Build

  ```
  $ npm run build
  ```
