import { gql } from "@apollo/client";

export const GET_TASKS = gql`
  query GET_TASKS {
    tasks {
      title
      description
      status
      dueDate
      id
    }
  }
`;

export const DELETE_TASK = gql`
  mutation Mutation($deleteTaskId: ID!) {
    deleteTask(id: $deleteTaskId)
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask(
    $id: ID!
    $title: String!
    $description: String!
    $status: String!
    $dueDate: String
  ) {
    updateTask(
      id: $id
      title: $title
      description: $description
      status: $status
      dueDate: $dueDate
    ) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask(
    $title: String!
    $description: String!
    $dueDate: String
  ) {
    createTask(title: $title, description: $description, dueDate: $dueDate) {
      id
      title
      description
      status
      dueDate
    }
  }
`;

export const GET_TASK_BY_ID = gql`
  query GetTask($id: String!) {
    taskById(id: $id) {
      id
      title
      description
      status
      dueDate
    }
  }
`;
