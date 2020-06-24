// %%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%%  AJAX API
// Very light-weight and addaptable AJAX API written By Pedram Emami 
// © Pedram Emami - 2020
// emami1@ualberta.ca  


export const Ajax = function (method, url, options = {}, async = true){
    if(method === undefined ||  (method.toUpperCase() !== 'GET' && method.toUpperCase() !== 'POST')){
        new Error('Passed method is not supported!');
    }

    return (function(){            
        function _ajax(method, url, async){
            this.method = method;
            this.url = url;
            this.async = async;
            this.options = options;
            this.callbacks = {
                progress: null,
                error: null,
                load: null,
            }
            this.headers = {'Content-Type': 'text/html'};
        }

        _ajax.prototype.setHeaders = function(headerName, headervalue){
            this.headers[headerName] = headervalue;
            return this;
        }
        _ajax.prototype.contentType = function(type){
            var mimeTypes = {
                'text' : 'text/plain',
                'html' : 'text/html',
                'css'  : 'text/css',
                'xml'  : 'text/xml',
                'form' : 'application/x-www-form-urlencoded',
                'js'   : 'application/javascript',
                'json' : 'application/json',
                'pdf'  : 'application/pdf',
                'zip'  : 'application/zip',
                'ai'   : 'application/postscript',
                'jpeg' : 'image/jpeg',
                'png'  : 'image/png',
                'gif'  : 'image/gif',
                'svg'  : 'image/svg+xml',
                'wma'  : 'audio/x-ms-wma',
                'mp4'  : 'video/mp4',
            }
            this.headers['Content-Type'] = mimeTypes[type];
            return this;
        }
        _ajax.prototype.contentDisposition = function(value){
            this.headers['Content-Disposition'] = value;
            return this;
        }
        _ajax.prototype.onProgress = function(cb){
            this.callbacks.progress = cb;
            return this;
        }
        _ajax.prototype.done = function(data, cb){
            var xhr = new XMLHttpRequest();
            if(this.options.responseType && typeof this.options.responseType === "string"){
                xhr.responseType = this.options.responseType;
            }
            if(typeof this.callbacks.progress === "function"){
                xhr.addEventListener('progress', this.callbacks.progress, false)
            } 
            xhr.open(this.method, this.url, this.async);
            for (let item in this.headers){
                xhr.setRequestHeader(item, this.headers[item]);
            }
            xhr.onreadystatechange = function(){
                if(xhr.readyState === 4) {
                    if (xhr.status === 200) {
                        cb.call(null, xhr.response);
                    } else {
                        new Error('Some Error has occurred!');
                    }   
                }
            }
            xhr.send(data);
        }
        return new _ajax(method, url, options, async);
    })()
}

export const workspaceInspector = function(props){
    const length = props.workspaces.length;
    const selectedWorkspace = props.selectedWorkspace;
    const index = selectedWorkspace.index;

    if(length === 0){
        return {
            id: null,
            name:{
                lastAssigned: "file",
                current: "file",
            },
            codeOption: {
                checked: false,
                disabled: false,
            },
            outputOption: {
                checked: false,
                disabled: false,
            },
            outformat: {
                value: "html",
                disabled: false
            }, 
            codeText: "",
            output: {
                outformat: "",
                errorType: null,
                errorCode: null,
                errorText: null,
                response:  null,
                isUpdated: false
            },
            corePanesDisplay: {
                codePane: true,
                outputPane: true
            },
        }

    }else{
        return props.workspaces[index];
    }
}
