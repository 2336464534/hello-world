'use strict';

module.exports = app => {
    class Demo extends app.Controller {
        async demo() {
            const { ctx } = this;
            const { request: { body, query }, response } = ctx
            ctx.body = {
                code: 1,
                list: [1],
                detail: {
                    1: {
                        body: body,
                        query: query
                    }
                }
            }
        }
    }
    return Demo;
};
