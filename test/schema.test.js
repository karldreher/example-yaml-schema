const fs = require("fs");
const Ajv = require("ajv").default;
const yaml = require("js-yaml");
//create a class for Yaml files which has two attributes, the file path and the schemapath
class customYamlFile {
  constructor(filePath, schemaPath) {
    this.filePath = filePath;
    this.schemaPath = schemaPath;
    this.relSchemaPath = `../${this.schemaPath}`;
    this.parsedYaml = yaml.load(fs.readFileSync(this.filePath, "utf8"));
  }
}

let customYamlFiles = [
  new customYamlFile("my-cool-app/config.yaml", "my-cool-app/config.schema.json"),
];

describe(`Validate Schemas`, () => {
  /**
   this looks horrific but is mostly to have a tidy name.  
    "y" is the only part that matters,"s" in the string refers to the dynamic test name.
  */
  it.each(customYamlFiles.map((y) => [y.filePath, y.schemaPath, y]))(
    `'%s' validates against '%s'`,
    async (y) => {
      const ajv = new Ajv();
      const schema = ajv.compile(require(y.relSchemaPath));
      const valid = schema(y.parsedYaml);

      expect(valid).toBe(true);
    }
  );
});
