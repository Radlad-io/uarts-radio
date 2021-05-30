
const response = {
    
    "kind": "youtube#liveBroadcastListResponse",
    "etag": "RuuXzTIr0OoDqI4S0RU6n4FqKEM",
    "pageInfo": {
        "totalResults": 0,
        "resultsPerPage": 5
    },
    "items": []
      
}

module.exports ={
    index: async ctx => {
        ctx.send(response)
    }
}