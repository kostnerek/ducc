module.exports = {
    apps: [
        {
            name: "ducc-investigator",
            script: "yarn",
            args: "start",
            cron_restart: "0 15 * * *",
            interpreter: "bash"
        }
    ]
};
