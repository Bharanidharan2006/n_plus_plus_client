## Refactoring

[ ] - Move all the common styles into a single common stylesheet.
[ ] - Separate utility functions, helper functions and also maps and other common variables

## Check

[ ] - Change dates and use date string to be server timezone inspecific
[ ] - Update crons and run them separately since when you scale mutliple instances might run and your cron can run multiple times. Or use db checks

