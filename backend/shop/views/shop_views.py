from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from ..models.shop import Shop
from ..models.auth import User
from ..serializers.shop_serializers import ShopSerializer, ShopOwnerSerializer
from ..permissions import IsOwnerOrReadOnly


class ShopOwnerViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ShopOwnerSerializer

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = [TokenAuthentication]


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def list(self, request, *args, **kwargs):
        """
        Filter using the owner id & return shop details
        """
        owner_id = kwargs['owner_id']
        shops = self.queryset.filter(owner_id=owner_id)
        serializer = ShopSerializer(
            instance=shops, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
