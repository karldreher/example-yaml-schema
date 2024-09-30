import pytest
import yaml
from jsonschema import validate, ValidationError
import json

# Load the schema from config.schema.json
def load_schema():
    with open('my-cool-app/config.schema.json', 'r') as file:
        return json.load(file)

# Define the schema
schema = load_schema()

# Load the config.yaml file
def load_config():
    with open('my-cool-app/config.yaml', 'r') as file:
        return yaml.safe_load(file)

# Test the config.yaml against the schema
def test_config_schema():
    config = load_config()
    try:
        validate(instance=config, schema=schema)
    except ValidationError as e:
        pytest.fail(f"Config validation error: {e.message}")
