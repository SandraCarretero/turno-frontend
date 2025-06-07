import { useState, useEffect } from "react"
import { useQuery, useQueryClient } from "@tanstack/react-query"
import { userAPI } from "../../services/api"
import { useAuth } from "../../context/AuthContext"
import ProfileHeader from "../../components/ProfileHeader/ProfileHeader"
import ProfileTabs from "../../components/ProfileTabs/ProfileTabs"
import MatchList from "../../components/MatchList/MatchList"
import GameCollection from "../../components/GameCollection/GameCollection"
import EditProfileModal from "../../components/EditProfileModal/EditProfileModal"
import { PageContainer } from "./ProfilePage.styles"
import FriendsList from "../../components/FriendsList/FriendsList"
import { useParams } from "react-router-dom"
import Loader from "../../components/Loader/Loader"

const ProfilePage = () => {
  const [activeTab, setActiveTab] = useState("matches")
  const [showEditModal, setShowEditModal] = useState(false)
  const { user: authUser } = useAuth()
  const { userId } = useParams()
  const queryClient = useQueryClient()

  const targetUserId = userId || authUser?._id
  const isOwnProfile = !userId || userId === authUser?._id

  const {
    data: profileData,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["userProfile", targetUserId],
    queryFn: () => userAPI.getUserProfile(targetUserId),
    staleTime: 1000 * 30, // Reducido a 30 segundos para actualizaciones más frecuentes
    cacheTime: 1000 * 60 * 5, // 5 minutos en caché
    refetchOnWindowFocus: true, // Refrescar cuando la ventana vuelve a tener foco
    refetchOnMount: true, // Siempre refrescar al montar
    enabled: !!targetUserId,
  })

  // Función para invalidar todas las queries relacionadas con el perfil
  const invalidateProfileQueries = () => {
    queryClient.invalidateQueries(["userProfile", targetUserId])
    queryClient.invalidateQueries(["user", targetUserId])
    queryClient.invalidateQueries(["userMatches", targetUserId])
    queryClient.invalidateQueries(["userGames", targetUserId])
    queryClient.invalidateQueries(["userFriends", targetUserId])
    queryClient.invalidateQueries(["userStats", targetUserId])

    // Si es el perfil propio, también invalidar las queries del usuario autenticado
    if (isOwnProfile) {
      queryClient.invalidateQueries(["userProfile", authUser?._id])
      queryClient.invalidateQueries(["user", authUser?._id])
      queryClient.invalidateQueries(["userMatches"])
      queryClient.invalidateQueries(["userGames"])
      queryClient.invalidateQueries(["userFriends"])
      queryClient.invalidateQueries(["userStats"])
    }
  }

  // Escuchar eventos de actualización de datos
  useEffect(() => {
    const handleDataUpdate = (event) => {
      console.log("📡 Evento de actualización de datos recibido:", event.detail)
      invalidateProfileQueries()
      refetch()
    }

    // Escuchar eventos personalizados para actualizaciones
    window.addEventListener("gameAdded", handleDataUpdate)
    window.addEventListener("gameRemoved", handleDataUpdate)
    window.addEventListener("friendAdded", handleDataUpdate)
    window.addEventListener("friendRemoved", handleDataUpdate)
    window.addEventListener("matchAdded", handleDataUpdate)
    window.addEventListener("matchUpdated", handleDataUpdate)
    window.addEventListener("matchDeleted", handleDataUpdate)
    window.addEventListener("profileUpdated", handleDataUpdate)

    return () => {
      window.removeEventListener("gameAdded", handleDataUpdate)
      window.removeEventListener("gameRemoved", handleDataUpdate)
      window.removeEventListener("friendAdded", handleDataUpdate)
      window.removeEventListener("friendRemoved", handleDataUpdate)
      window.removeEventListener("matchAdded", handleDataUpdate)
      window.removeEventListener("matchUpdated", handleDataUpdate)
      window.removeEventListener("matchDeleted", handleDataUpdate)
      window.removeEventListener("profileUpdated", handleDataUpdate)
    }
  }, [targetUserId, refetch])

  // Actualizar cuando cambia el usuario autenticado
  useEffect(() => {
    if (isOwnProfile && authUser) {
      console.log("👤 Usuario autenticado actualizado, refrescando perfil...")
      invalidateProfileQueries()
      refetch()
    }
  }, [authUser])

  // Actualizar cuando cambia el targetUserId
  useEffect(() => {
    if (targetUserId) {
      console.log("🔄 Target user ID cambió, refrescando datos...")
      invalidateProfileQueries()
      refetch()
    }
  }, [targetUserId])

  // Sincronizar datos del perfil con el contexto de autenticación
  useEffect(() => {
    if (profileData?.user && isOwnProfile && profileData.user._id === authUser?._id) {
      // Actualizar el contexto de autenticación con los datos más recientes
      queryClient.setQueryData(["user", authUser._id], profileData.user)
    }
  }, [profileData, isOwnProfile, authUser, queryClient])

  // Función para refrescar manualmente
  const handleRefresh = async () => {
    console.log("🔄 Refrescando datos del perfil manualmente...")
    invalidateProfileQueries()
    await refetch()
  }

  // Función para manejar la edición del perfil
  const handleEditProfile = () => {
    setShowEditModal(true)
  }

  // Función para manejar el éxito de la edición del perfil
  const handleEditSuccess = async () => {
    console.log("✅ Perfil editado exitosamente, actualizando datos...")
    setShowEditModal(false)

    // Emitir evento personalizado
    window.dispatchEvent(new CustomEvent("profileUpdated", { detail: { userId: targetUserId } }))

    // Invalidar y refrescar
    invalidateProfileQueries()
    await refetch()
  }

  // Determinar qué datos mostrar - ESTA ES LA PARTE CLAVE
  const displayUser = isOwnProfile && authUser ? authUser : profileData?.user
  const displayGames = profileData?.user?.games || authUser?.games || []
  const displayFriends = profileData?.user?.friends || authUser?.friends || []
  const displayMatches = profileData?.matches || []

  // Estados de carga y error
  if (isLoading && !displayUser) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>Cargando perfil...</div>
        <Loader />
      </PageContainer>
    )
  }

  if (error && !displayUser) {
    return (
      <PageContainer>
        <div style={{ display: "flex", justifyContent: "center", padding: "2rem" }}>
          Error al cargar el perfil
          <button onClick={handleRefresh} style={{ marginLeft: "1rem" }}>
            Reintentar
          </button>
        </div>
      </PageContainer>
    )
  }

  return (
    <PageContainer>
      <ProfileHeader
        user={displayUser}
        onEditProfile={isOwnProfile ? handleEditProfile : undefined}
        matches={displayMatches}
        games={displayGames}
        friends={displayFriends}
        onRefresh={handleRefresh}
      />

      <ProfileTabs activeTab={activeTab} onTabChange={setActiveTab} />

      {activeTab === "matches" && <MatchList matches={displayMatches} loading={isLoading} onRefresh={handleRefresh} />}

      {activeTab === "games" && <GameCollection games={displayGames} loading={isLoading} onRefresh={handleRefresh} />}

      {activeTab === "friends" && (
        <FriendsList friends={displayFriends} loading={isLoading} onRefresh={handleRefresh} />
      )}

      {showEditModal && <EditProfileModal onClose={() => setShowEditModal(false)} onSuccess={handleEditSuccess} />}
    </PageContainer>
  )
}

export default ProfilePage