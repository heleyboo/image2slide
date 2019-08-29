class Error(Exception):
    """Base class for exceptions in this module."""
    pass

class GetAIProcessResultErr(Error):
    """Exception raised for errors when get board detection result error.

    Attributes:
        message -- explanation of the error
    """

    def __init__(self, message):
        self.message = message