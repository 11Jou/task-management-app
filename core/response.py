from rest_framework.response import Response
from rest_framework import status

class CustomResponse:
    
    @staticmethod
    def success(message, data=None, status_code=status.HTTP_200_OK):
        return Response({
            "success": True,
            "message": message,
            "data": data,
            "error": None
        }, status=status_code)
    
    @staticmethod
    def error(message, errors=None, status_code=status.HTTP_400_BAD_REQUEST):
        return Response({
            "success": False,
            "message": message,
            "data": None,
            "error": errors
        }, status=status_code)
        
        
    @staticmethod
    def unauthorized(message, errors=None, status_code=status.HTTP_401_UNAUTHORIZED):
        return Response({
            "success": False,
            "message": message,
            "data": None,
            "error": errors
        }, status=status_code)
    
    @staticmethod
    def created(data=None, message="Resource created successfully"):
        """Return a 201 Created response."""
        return CustomResponse.success(
            data=data,
            message=message,
            status_code=status.HTTP_201_CREATED
        )
        
        
    @staticmethod
    def no_content(message="Resource deleted successfully"):
        """Return a 204 No Content response with custom format."""
        return Response({
            "success": True,
            "message": message,
            "data": None,
            "errors": None
        }, status=status.HTTP_204_NO_CONTENT)