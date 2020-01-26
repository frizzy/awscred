## AWSCred

### Command-line tool to update non-defaylt AWS CLI credentials from your clipboard.

#### Installation:

1. Clone `awscred` in your scripts folder:
```
cd ~/scripts
git clone git@github.com:frizzy/awscred.git
```
2. Install packages:
```
npm install
```
or
```
yarn
```
3. Link the package to be used as the `awscred` shell command:
```
npm link
```
or
```
yarn link
```

#### Configuration:

The `AWSCRED` environment variable is a comma delimited list of environment pairs containing `<desired environment label>:<source label substring>`:

```
export AWSCRED="dev:sandbox,hive:Developer"
```

Alternatively, you may provide a `.env` file in the `awscred` code folder with the content:
```
AWSCRED="dev:sandbox,hive:Developer"
```

#### Usage:

Do this again every time your previous session expires.

1. Locate your AWS account environment credentials: Click on _Command line or programmatic access_.

2. Clicking on the credentials under _Option 2_ should copy it to your clipboard.

3. Run the `awscred` shell command.

4. Paste from your clipboard and press _return_.

Your profile label can be used for AWS SDK libraries and tools making use of your `$HOME/.aws/credentials` data where it can be specified as an environment variable:

```
AWS_PROFILE=dev hello_world.py
```
