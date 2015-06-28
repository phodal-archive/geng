# Geng

[![Build Status](https://travis-ci.org/phodal/geng.svg?branch=master)](https://travis-ci.org/phodal/geng)


      __ _  ___ _ __   __ _
     / _` |/ _ \ '_ \ / _` |
    | (_| |  __/ | | | (_| |
     \__, |\___|_| |_|\__, |
     |___/            |___/
 

> DSL trilogy 1 NLP. 

##Note

Waiting for Chrome to Support ``Proxy`` to use meta programming

     Object.createHandled = function(proto, objDesc, noSuchMethod) {
    
        var handler = {
          get: function(rcvr, p) {
            return function() {
              var args = [].slice.call(arguments, 0);
              return noSuchMethod.call(this, p, args);
            };
          },
        };
    
        var p = Proxy.create(handler, proto);
        return Object.create(p, objDesc);
      };


##License##

© 2015 [Phodal Huang](http://www.phodal.com). This code is distributed under the MIT license. See `LICENSE` in this directory.

[待我代码编成，娶你为妻可好](http://www.xuntayizhan.com/blog/ji-ke-ai-qing-zhi-er-shi-dai-wo-dai-ma-bian-cheng-qu-ni-wei-qi-ke-hao-wan/)
         
