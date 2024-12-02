import re

def camel_to_snake(name):
    """
    Converts a camelCase string to snake_case.
    """
    # Replace any capital letter with '_lowercase' equivalent
    s1 = re.sub('(.)([A-Z][a-z]+)', r'\1_\2', name)
    # Handle edge cases like abbreviations (e.g., 'testXML' -> 'test_xml')
    return re.sub('([a-z0-9])([A-Z])', r'\1_\2', s1).lower()

def snake_to_camel(name):
    """
    Converts a snake_case string to camelCase.
    """
    # Split by underscores and capitalize all but the first word
    components = name.split('_')
    return components[0] + ''.join(x.title() for x in components[1:])

def convert_keys_to_snake_case(data):
    """
    Converts all dictionary keys from camelCase to snake_case.
    """
    if isinstance(data, dict):
        # Recursively process nested dictionaries or lists
        return {camel_to_snake(k): convert_keys_to_snake_case(v) for k, v in data.items()}
    elif isinstance(data, list):
        # Process list elements if they're dictionaries or nested structures
        return [convert_keys_to_snake_case(item) for item in data]
    else:
        return data

def convert_keys_to_camel_case(data):
    """
    Converts all dictionary keys from camelCase to snake_case.
    """
    if isinstance(data, dict):
        # Recursively process nested dictionaries or lists
        return {camel_to_snake(k): convert_keys_to_snake_case(v) for k, v in data.items()}
    elif isinstance(data, list):
        # Process list elements if they're dictionaries or nested structures
        return [convert_keys_to_snake_case(item) for item in data]
    else:
        return data
    
def convert_keys_to_camel_case(data):
    """
    Converts all dictionary keys from snake_case to camelCase.
    """
    if isinstance(data, dict):
        # Recursively process nested dictionaries or lists
        return {snake_to_camel(k): convert_keys_to_camel_case(v) for k, v in data.items()}
    elif isinstance(data, list):
        # Process list elements if they're dictionaries or nested structures
        return [convert_keys_to_camel_case(item) for item in data]
    else:
        return data