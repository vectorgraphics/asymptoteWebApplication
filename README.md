![AWA Logo](https://www.dropbox.com/s/h9klqqz8f4j6eua/AWA.png?raw=1)

# Asymptote Web Application
This application is designed to provide a convenient way for Asymptote
language users to create vector graphics remotely without any local
installation.

## Installation
### Pre-Application Install
First install [npm] and [Node.js](https://nodejs.org). The application
requires Node.js **>= 22.23.4**; we recommend the latest **24.x LTS**
release (see `.nvmrc` and the `engines` field in `package.json`).

> **Security:** Node.js 14 is end-of-life and is vulnerable to
> **CVE-2026-111497** ("Node2Shell"), an out-of-bounds write in the
> bundled Google Brotli decoder that permits remote code execution.
> The Node.js project fixed this only in its 22.x, 24.x and 26.x
> security releases (2026-10-21), so hosts running Node.js 14 must
> upgrade the runtime rather than patch it in place.

The `build` and `start` scripts set `NODE_OPTIONS=--openssl-legacy-provider`,
which `react-scripts` 3 (webpack 4) requires on Node.js 17+ (OpenSSL 3).

### Application Installation
1. We recommend running this application as a non-privileged user
"asymptote" on a virtual machine.

2. Disable logins:

```
passwd -d asymptote
```

3. Install the latest version of [Asymptote](https://asymptote.sourceforge.io/)
on the system.

4. Starting as a user belonging to the asymptote group, install the node
modules and application dependencies:

```
cd ~asymptote
git clone https://github.com/vectorgraphics/asymptote-server
cd asymptote-server
su
su asymptote
make
exit
exit
```

5. We recommend running the bash script

```
pruneClients 1800
```
as a cronjob at regular intervals to clean up disconnected sessions;
the argument specifies the number of seconds after the last ping at which
the client is considered disconnected and its workspace is deleted.
By default, pings are sent from active clients to the server every 600
seconds.

# Running the Application
There are two modes for running this application:

1. **Running the full application:** To run the full application run the
    following commands

```
cd ~asymptote/asymptote-server
sudo make run
```

Root privileges are dropped once the application is listening
on port 80. The application can then be accessed on

```
http://localhost:80
```

2. **Running only the front-end part of the application:**
   This mode is mainly used for development of the GUI to test
   the CSS and Javascript code. No communication can be made to
   the server in this mode. To launch the application in this
   mode on a localhost service:

```
cd ~asymptote/asymptote-server
make frontend
```

## People & Licensing

### Asymptote Vector Graphics Language

|Licence       | LGPL 3.0+                                  |
|:-------------|:----------                                 |
|Design Team   |Andy Hammerlindl, John C. Bowman, Tom Prince|
|First Appeared| 2004                                       |
|Host          | https://asymptote.sourceforge.io           |

### Asymptote Web Application

|Licence       | LGPL 3.0+                                                                     |
|:-------------|:------------------------------------------------------------------------------|
|Design Team   | Pedram Emami (emami1@ualberta.ca, pedweb.consultant@gmail.com), John C. Bowman|
|First Appeared| 2020                                                                          |
|Host          | http://asymptote.ualberta.ca                                                  |
