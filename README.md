![AWA Logo](https://www.dropbox.com/s/h9klqqz8f4j6eua/AWA.png?raw=1)

# Asymptote Web Application
This application is designed to provide a convenient way for Asymptote
language users to create vector graphics remotely without any local
installation.

## Installation
### Pre-Application Install
First install [Node.js](www.nodejs.org).

### Application Installation
1. We recommend running this application as a non-privileged user
"asymptote" on a virtual machine.

2. Disable logins:
    ```bash
    passwd -d asymptote
    ```
3. Install the latest version of [Asymptote](https://asymptote.sourceforge.io/)
on the system.

4. Starting as a user belonging to the asymptote group, install the node
modules and application dependencies:
    ```bash
    cd ~asymptote
    git clone https://github.com/vectorgraphics/asymptote-server
    cd asymptote-server
    su
    su asymptote
    make
    exit
    exit
    ```

5.  We recommend running the bash script

    ```bash
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

    ```bash
    cd ~asymptote/asymptote-server
        sudo make run
    ```

    Root priviledges are dropped once the application is listening
    on port 80. The application can then be accessed on

    ```bash
    http://localhost:80
    ```

2.  **Running only the front-end part of the application:**
    This mode is mainly used for development of the GUI to test
    the CSS and Javascript code. No communication can be made to
    the server in this mode. To launch the application in this
    mode on a localhost service:

    ```bash
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