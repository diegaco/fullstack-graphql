import React, {useState} from 'react'
import gql from 'graphql-tag'
import { useQuery, useMutation } from '@apollo/react-hooks'
import PetsList from '../components/PetsList'
import NewPetModal from '../components/NewPetModal'
import Loader from '../components/Loader'

const ALL_PETS = gql`
  query AllPets {
    pets {
      id
      name
      type
      img
    }
  }
`;

const CREATE_PET = gql`
  mutation CreateAPet($newPet: NewPetInput!) {
    addPet(input: $newPet) {
      id
      name
      type
      img
      __typename
    }
  }
`;

export default function Pets() {
  const [modal, setModal] = useState(false)
  const { data: queryData, loading: queryLoading, error: queryError } = useQuery(ALL_PETS)
  const [
    addPet, {
      data: mutationData,
      loading: mutationLoading,
      error: mutationError
    }
  ] = useMutation(CREATE_PET, {
    update(cache, { data: { addPet } }) {
      const { pets } = cache.readQuery({ query: ALL_PETS });
      cache.writeQuery({
        query: ALL_PETS,
        // data: { pets: pets.concat([addPet])}
        data: { pets: [addPet, ...pets]}
      })
    }
  });

  const onSubmit = ({ name, type }) => {
    setModal(false)
    addPet({
      variables: {
        newPet: {name, type}
      },
      optimisticResponse: {
        __typename: "Mutation",
        addPet: {
          id: Math.floor(Math.random() * 1000) + name,
          name,
          type,
          img: 'https://via.placeholder.com/300x300',
          __typename: "Pet"
        }
      }
    });
  }

  if (queryError || mutationError) {
    return <p>error! - {mutationError.message}</p>
  }

  if (queryLoading) {
    return <Loader />
  }

  if (modal) {
    return <NewPetModal onSubmit={onSubmit} onCancel={() => setModal(false)} />
  }

  return (
    <div className="page pets-page">
      <section>
        <div className="row betwee-xs middle-xs">
          <div className="col-xs-10">
            <h1>Pets</h1>
          </div>

          <div className="col-xs-2">
            <button onClick={() => setModal(true)}>new pet</button>
          </div>
        </div>
      </section>
      <section>
        <PetsList pets={queryData.pets} />
      </section>
    </div>
  )
}