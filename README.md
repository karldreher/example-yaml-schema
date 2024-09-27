# example-yaml-schema
How To:  Develop your own YAML schema and have a better time doing it


# Overview
This project demonstrates how to improve workflows for YAML files.

There are at least 4 different times when a developer may encounter an error that was introduced to a YAML file's schema, particularly when the schema was developed *specifically for the project*: 

1. During development.
2. During build/test phases.
3. At runtime.
4. During debugging.

The cost of troubleshooting errors increases according to the order listed above.

At whichever stage the bug is *detected*, the outcome can be usually improved by detecting the failure sooner (ideally as close to #1 as possible.)

This is where *enforcing our YAML's schema* comes in handy.  

# Example - This Repo
In this repo, the writer hopes to simplify a couple complex concepts, and demonstrate them for easier repeatability.  (at times, for himself)

There will be a heavy emphasis on #1 and #2 listed above.

It will particularly emphasize the usefulness of [Redhat YAML Extension for VSCode](https://github.com/redhat-developer/vscode-yaml) in combination with [JSON Schema](https://json-schema.org/).

Start by observing the files in `my-cool-app` within this repo.

## Start with a schema.
Note the file `config.yaml`, which has a few different elements in it.  Comments within the file will briefly describe notable parts.  

The more important part is the `config.schema.json` which is in the same folder, and the reference to it at the top of `config.yaml`.  

The schema describes a YAML file *with json* (YAML and JSON are, after all, essentially the same), which :  

- Has a top level `config:` object.  
- `config:` requires two objects as properties of it, `apples:` and `blueberries`.  
- Each fruit `apples` and `blueberries` has a different required shape, which can be better appreciated within the schema itself.  

Now that we have a schema, we want to catch some errors!

## Catching errors in local development.
With our well-defined schema in tow, we can connect this to our schema file.
As mentioned, the `config.yaml` file has a reference to it already:

```yaml
# yaml-language-server: $schema=config.schema.json
```

This is an important fixture.  Assuming you would interact with the repo using VSCode (and assuming you take the reccomendation that `.vscode/extensions.json` would give you), you might be prompted to install the extension [Redhat YAML Extension for VSCode](https://github.com/redhat-developer/vscode-yaml).

Once we have the extension installed, the schema in the file is *automatically enforced* within the IDE.  You could test this by trying to add a property to one of the items in `apples`: 

```
    - color: red
      size: small
      quantity: 5
      # New property below, note the squiggles that may appear! 
      tasty: false

```
You should see a red mark appear that will indicate to you that the property is not allowed.  You can also hover over it to get that detail.