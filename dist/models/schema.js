"use strict";
/*
    User
        id : Id
        name : string
        email : string
        password : string
        role : int - use enum
        refreshToken : string
        workspaces : Array<Id> - FK


    Workspace
        id : Id
        name : string - channel name
        avatar : string
        email : string - channel associated email
        owner : Id - FK(Youtuber Id)
        refreshToken : string - get from Youtube OAuth


    uploadedVideo
        id : Id
        title : string
        thumbnail : string
        editor : Id - FK
        workspace : Id - FK
        youtuber : Id - FK

*/ 
