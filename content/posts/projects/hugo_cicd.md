+++
title = "Hugo Site CI/CD"
date = "2024-10-21"
+++

the goal: <br>

<b> build a hugo site locally, create a github repo to store it, and set up ci/cd so that when I push the repo it automatically publishes to my uberspace asteroid and is accessible from a browser. </b> <br>

despite the numerous guides online, including in uberspace's wonderful [documentation](https://manual.uberspace.de/), nothing seemed to work for me correctly. <br>

what I ended up going with was an amalgam of different approaches, and I will outline them coherently here. <br>

Use this as a start, and create a md file with the following information. please do not capitalize except the word "I". 

---

### step 1.) create an uberspace asteroid at [uberspace](https://uberspace.de/en/)

thanks to uberspace for providing the tools to get this done! they are wonderful, and you can get a virtual linux machine running in a few minutes. for free! (for 30-60 days) - and pay as you want after that. 

simply sign up for an account, and then fill in a name in the 'create a new asteroid' box. save this name for later, it will be your username when logging into this server. 

---

### step 2.) login to your uberspace asteroid

click into your asteroid from the uberspace dashboard. click on the 'logins' tab. 

here, you can choose to set a basic password to quickly log into your uberspace if you want. this is what I did the first time I logged in. 

you may feel like skipping this step and going straight to generating an ssh key pair. this is OK. 

---

### step 3.) generate an ssh key pair to use with github actions.

<b>on your local machine:</b>  
I found the following command [here](https://zellwk.com/blog/github-actions-deploy/):

```ssh-keygen -t rsa -b 4096 -C "your_email@example.com"```


which worked for me when generating a key. apparently, github actions does not like keys in the ed25519 format for key encryption. in 2024, this may have changed, but this is what worked for me after many, many attempts at authentication. 

you will be prompted to name your key. I named it 'github_actions' to differentiate it. 

you will also be prompted to enter a password for the private key. <b> DO NOT</b> enter a password here, github actions will be unable to enter it later. This <i>will</i> cause you many, many headaches if misconfigured.

once this is done, enter the following command and copy the <i>whole output</i>:

```cat github_actions.pub```


this is your public key. now navigate to your uberspace's asteroid dashboard (the same place you may have entered your password in step 2). 

paste the contents of the public key into the 'add a public ssh key' and press the 'go' button.

---

### step 4.) creating the hugo site.

if you haven't already installed hugo on your system, please follow the instructions outlined [here](https://gohugo.io/installation/). select your appropriate computing system and follow the instructions to install the hugo cli.

building a hugo site can be done with one simple command:

``` hugo new site example-site```


where example-site is your desired site name. keep in mind, it will create a subfolder named 'example-site' in the directory you are currently in. 

you can now `cd` into the example-site directory: ``` cd example-site ```

now, initialize a git repository: ```git init```


and next, you must choose a theme. hugo has an excellent selection of themes to pick from [on their site](https://themes.gohugo.io/). pick one that appeals to you and follow the instructions to install it. generally, it will be something like (I used the console theme):

```git submodule add https://github.com/mrmierzejewski/hugo-theme-console.git hugo-theme-console```


there may be additional steps to this setup, like overriding your ```hugo.toml``` file. follow the instructions relevant to the theme you chose.

note: if you are installing on uberspace (and we are), you must add the following to your config.yml file as well:

```hugo_cache = '/home/USER/tmp'``` 
```publishDir = '/var/www/virtual/USER/html'```


where USER is the name of your asteroid from earlier.

while you're at it, change the baseURL to be blank for now, if you're not using a subdomain: ```baseURL=''```

once you have properly configured the theme, you can test your site with the command: ```hugo serve```


this will open your hugo site at the localhost address provided in the command output.

make sure the navigation works and the pictures and text display correctly. 

if you like what you see, we can proceed with creating the 'public' folder by using the command:```hugo```


note: this command <i>should</i> work for you. personally, I have to use the command ```hugo -d public```


to force it to build in the public folder.

---

### step 5.) create the github repo

you can do this one of two ways: using the command line, or using the GUI at github.com.

if you use the github cli, you can use the [instructions](https://cli.github.com/manual/gh_repo_create) to create a new repository.

if you use the website GUI, navigate to the green 'new' button in the upper right and follow the prompts to create a new repository. once you have created the repo, you can get its address by using the green 'code' button where the 'new' button was before. this will give you a github address, copy this and save it.

now go back to the folder you created on your local machine with hugo (example-site). make sure you are in the same directory as the git repository you generated.

now input the following command: ```git remote add origin https://github.com/USER/example-site.git```


where USER and example-site are your github username, and repo name respectively. you should have this address copied from the 'code' button on github.

now line up your changes with ```git commit . -m 'some commit message'``` 


once you have committed these changes, push them with ``` git push ```


you may have to configure your git username and email. follow the onscreen prompts to do so.

---

### step 6.) configure github actions

almost there! now that you git push'd the changes, you can check on github to make sure the changes are reflected there. pull up the url you saved earlier (https://github.com/USER/example-site.git) and see if the repo has filled.

hopefully, everything went smooth and you have files in your github repo.

now go to the 'actions' tab at the top of your repo. you can click the link to manually add a file, and paste the following:

```
name: deploy example-site 
    on: push: 
    branches: [master] 
jobs: 
    build-and-deploy: 
        runs-on: ubuntu-latest 
            steps: 
            - uses: actions/checkout@v4 
            - name: Deploy using Rsync 
                uses: burnett01/rsync-deployments@6.0.0 
                with: switches: -avrh --delete 
                path: ./public/ 
                remote_path: /var/www/virtual/${{ vars.UBERSPACE_USER }}/html 
                remote_host: ${{ vars.UBERSPACE_HOST }} 
                remote_user: ${{ vars.UBERSPACE_USER }} 
                remote_key: ${{ secrets.SSH_PRIVATE_KEY }}
```


alternatively, in your project's directory on your local machine, you may create a directory structure like `.github/workflows`. then create a file called 'deploy.yml' and add the above content. save the file, but <i>do not</i> yet push the changes.

navigate back to your github directory. click on the 'settings' tab with the gear icon next to it. under the section entitled 'security', navigate to 'secrets and variables'. from the dropdown, select 'actions'. next, you'll want to copy your private key from earlier into a repository secret and name it SSH_PRIVATE_KEY.

---

### step 7.) putting it all together

so far we have:

* created an uberspace account
* created a github repo (with the cli or the website gui)
* generated a pair of ssh keys
* added the public ssh key value to the uberspace account
* added the private ssh key value to the github account secrets
* configured a github action that will copy the contents of the 'public' folder in the hugo project directory to the appropriate spot on the uberspace asteroid

now the last step is to cross your fingers, and `git push` the local repository to the github repo. this should trigger the github action, which in turn copies those files to the uberspace public directory. to see the github action in...action...simply navigate to the 'actions' tab and view your run. if it was successful, a green check mark will be next to it.

next, you can navigate to your asteroid - something like <i>USER.uber.space</i> - to see your site in action.

thanks for your considerable time investment. 

- fox

















